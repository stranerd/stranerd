import { AuthFirebaseDataSource } from './data/datasources/auth-firebase'
import { AuthRepository } from './data/repositories/auth'
import { SigninWithGoogleUseCase } from './domain/usecases/auth/signinWithGoogle'
import { SessionSigninUseCase } from './domain/usecases/auth/sessionSignin'
import { SessionSignoutUseCase } from './domain/usecases/auth/sessionSignout'
import { UpdateProfileUseCase } from './domain/usecases/auth/updateProfile'
import { SigninWithEmailUseCase } from './domain/usecases/auth/signinWithEmail'
import { SignupWithEmailUseCase } from './domain/usecases/auth/signupWithEmail'
import { SendVerificationEmailUseCase } from './domain/usecases/auth/sendVerificationEmail'
import { SendPasswordResetEmailUseCase } from './domain/usecases/auth/sendPasswordResetMail'
import { ProfileUpdateFactory } from './domain/factories/profileUpdate'
import { EmailSigninFactory } from './domain/factories/emailSignin'
import { EmailSignupFactory } from './domain/factories/emailSignup'
import { PasswordResetFactory } from './domain/factories/passwordReset'

const authDataSource = new AuthFirebaseDataSource()

const authRepository = new AuthRepository(authDataSource)

export const SigninWithGoogle = new SigninWithGoogleUseCase(authRepository)
export const SigninWithEmail = new SigninWithEmailUseCase(authRepository)
export const SignupWithEmail = new SignupWithEmailUseCase(authRepository)
export const SendVerificationEmail = new SendVerificationEmailUseCase(authRepository)
export const SendPasswordResetEmail = new SendPasswordResetEmailUseCase(authRepository)
export const UpdateProfile = new UpdateProfileUseCase(authRepository)
export const SessionSignin = new SessionSigninUseCase(authRepository)
export const SessionSignout = new SessionSignoutUseCase(authRepository)

export { ProfileUpdateFactory, EmailSigninFactory, EmailSignupFactory, PasswordResetFactory }
