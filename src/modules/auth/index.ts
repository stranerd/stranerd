import { AuthFirebaseDataSource } from './data/datasources/auth-firebase'
import { AuthRepository } from './data/repositories/auth'
import { SigninWithEmailUseCase } from './domain/usecases/auth/signinWithEmail'
import { SigninWithGoogleUseCase } from './domain/usecases/auth/signinWithGoogle'
import { SignupWithEmailUseCase } from './domain/usecases/auth/signupWithEmail'
import { SessionSigninUseCase } from './domain/usecases/auth/sessionSignin'
import { SessionSignoutUseCase } from './domain/usecases/auth/sessionSignout'
import { ResetPasswordUseCase } from './domain/usecases/auth/resetPassword'
import { UpdatePasswordUseCase } from './domain/usecases/auth/updatePassword'
import { EmailSigninFactory } from './domain/factories/emailSignin'
import { EmailSignupFactory } from './domain/factories/emailSignup'
import { PasswordResetFactory } from './domain/factories/passwordReset'
import { PasswordUpdateFactory } from './domain/factories/passwordUpdate'

const authDataSource = new AuthFirebaseDataSource()

const authRepository = new AuthRepository(authDataSource)

export const SigninWithEmail = new SigninWithEmailUseCase(authRepository)
export const SigninWithGoogle = new SigninWithGoogleUseCase(authRepository)
export const SignupWithEmail = new SignupWithEmailUseCase(authRepository)
export const ResetPassword = new ResetPasswordUseCase(authRepository)
export const UpdatePassword = new UpdatePasswordUseCase(authRepository)
export const SessionSignin = new SessionSigninUseCase(authRepository)
export const SessionSignout = new SessionSignoutUseCase(authRepository)

export { EmailSigninFactory, EmailSignupFactory, PasswordResetFactory, PasswordUpdateFactory }
