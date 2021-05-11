import { AuthFirebaseDataSource } from './data/datasources/auth-firebase'
import { AuthRepository } from './data/repositories/auth'
import { SigninWithGoogleUseCase } from './domain/usecases/auth/signinWithGoogle'
import { SendSigninEmailUseCase } from './domain/usecases/auth/sendSigninEmail'
import { SigninWithEmailLinkUseCase } from './domain/usecases/auth/signinWithEmailLink'
import { SessionSigninUseCase } from './domain/usecases/auth/sessionSignin'
import { SessionSignoutUseCase } from './domain/usecases/auth/sessionSignout'
import { UpdateProfileUseCase } from './domain/usecases/auth/updateProfile'
import { EmailLinkSigninFactory } from './domain/factories/emailLinkSignin'
import { ProfileUpdateFactory } from './domain/factories/profileUpdate'
import { EmailSigninFactory } from './domain/factories/emailSignin'
import { EmailSignupFactory } from './domain/factories/emailSignup'
import { PasswordResetFactory } from './domain/factories/passwordReset'
import { PasswordUpdateFactory } from './domain/factories/passwordUpdate'

const authDataSource = new AuthFirebaseDataSource()

const authRepository = new AuthRepository(authDataSource)

export const SigninWithGoogle = new SigninWithGoogleUseCase(authRepository)
export const SendSigninEmail = new SendSigninEmailUseCase(authRepository)
export const SigninWithEmailLink = new SigninWithEmailLinkUseCase(authRepository)
export const UpdateProfile = new UpdateProfileUseCase(authRepository)
export const SessionSignin = new SessionSigninUseCase(authRepository)
export const SessionSignout = new SessionSignoutUseCase(authRepository)

export { EmailLinkSigninFactory, ProfileUpdateFactory, EmailSigninFactory, EmailSignupFactory, PasswordUpdateFactory, PasswordResetFactory }
