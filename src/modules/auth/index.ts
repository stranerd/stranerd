import { AuthFirebaseDataSource } from './data/datasources/auth-firebase'
import { AuthRepository } from './data/repositories/auth'
import { SigninWithEmailUseCase } from './domain/usecases/signinWithEmail'
import { SigninWithGoogleUseCase } from './domain/usecases/signinWithGoogle'
import { SignupWithEmailUseCase } from './domain/usecases/signupWithEmail'
import { SessionSigninUseCase } from './domain/usecases/sessionSignin'
import { SessionSignoutUseCase } from './domain/usecases/sessionSignout'
import { GetEmailSigninFactoryUseCase } from './domain/usecases/getEmailSigninFactory'
import { GetEmailSignupFactoryUseCase } from './domain/usecases/getEmailSignupFactory'
import { GetPasswordResetFactoryUseCase } from './domain/usecases/getPasswordResetFactory'
import { ResetPasswordUseCase } from './domain/usecases/resetPassword'
import { UpdatePasswordUseCase } from './domain/usecases/updatePassword'
import { GetPasswordUpdateFactoryUseCase } from './domain/usecases/getPasswordUpdateFactory'

const authDataSource = new AuthFirebaseDataSource()

const authRepository = new AuthRepository(authDataSource)

export const SigninWithEmail = new SigninWithEmailUseCase(authRepository)
export const SigninWithGoogle = new SigninWithGoogleUseCase(authRepository)
export const SignupWithEmail = new SignupWithEmailUseCase(authRepository)
export const ResetPassword = new ResetPasswordUseCase(authRepository)
export const UpdatePassword = new UpdatePasswordUseCase(authRepository)
export const SessionSignin = new SessionSigninUseCase(authRepository)
export const SessionSignout = new SessionSignoutUseCase(authRepository)
export const GetEmailSigninFactory = new GetEmailSigninFactoryUseCase()
export const GetEmailSignupFactory = new GetEmailSignupFactoryUseCase()
export const GetPasswordResetFactory = new GetPasswordResetFactoryUseCase()
export const GetPasswordUpdateFactory = new GetPasswordUpdateFactoryUseCase()
