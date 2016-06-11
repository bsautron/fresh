import oauth2orize from 'oauth2orize';
import models from '../models';
import generateUid from '../helpers/generateUid';

let server = oauth2orize.createServer();

server.serializeClient((client, callback) => {
  console.log('server.serializeClient');
  return callback(null, client._id);
});

server.deserializeClient((id, callback) => {
  console.log('server.deserializeClient');
  models.ClientSchema.findOne({ _id: id }, (err, client) => {
    if (err) return callback(err);
    callback(null, client);
  });
});

server.grant(oauth2orize.grant.code((client, redirectUri, user, ares, callback) => {
  console.log('server.grant');
  let code = new models.CodeSchema({
    value: generateUid(16),
    client_id: client._id,
    redirect_uri: redirectUri,
    user_id: user._id
  });

  code.save()
    .then(() => callback(null, code.value))
    .catch((err) => callback(err));
}));

// Exchange authorization codes for access tokens
server.exchange(oauth2orize.exchange.code((client, code, redirectUri, callback) => {
  console.log('server.exchange');
  models.CodeSchema.findOne({ value: code }, (err, authCode) => {
    if (err) return callback(err);
    if (authCode === undefined) return callback(null, false);
    if (client._id.toString() !== authCode.client_id) return callback(null, false);
    if (redirectUri !== authCode.redirect_uri) return callback(null, false);

    let token = new models.TokenSchema({
      value: uid(256),
      client_id: authCode.client_id,
      user_id: authCode.user_id
    });
    // Delete auth code now that it has been used
    authCode.remove()
      .then(() => token.save())
      .then(() => callback(null, token))
      .catch((err) => callback(err));

  });
}));

export default {
  authorization: [
    server.authorization((clientId, redirectUri, callback) => {
      console.log('server.authorization');
      models.ClientSchema.findOne({key: clientId}, (err, client) => {
        console.log('CLIENT:', client);
        if (err) return callback(err);
        callback(null, client, redirectUri);
      })
    }),
    (req, res) => {
      console.log(req.oauth2);
      res.render('dialog', { transactionID: req.oauth2.transactionID, user: req.user, client: req.oauth2.client});
    }
  ],
  decision: [server.decision()],
  token: [server.token(), server.errorHandler()]
};
