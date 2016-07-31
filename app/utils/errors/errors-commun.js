import aclErrors from '../../modules/acl/acl-errors';

export default Object.assign(aclErrors, {
	'id-bad-format': {status: 400, description: 'The ID in the URI is bad formated'},
	'role-required': {description: 'Field "role" is required', code: 9000},
	'age-required': {description: 'Field "age" is required', code: 9001},
	'password-required': {description: 'Field "password" is required', code: 9002},
	'username-required': {description: 'Field "username" is required', code: 9003},
	'email-required': {description: 'Field "email" is required', code: 9004},
});
