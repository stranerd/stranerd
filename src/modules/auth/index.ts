import { AuthFirebaseDataSource } from './data/datasources/auth-firebase'
import { AuthRepository } from './data/repositories/auth'
import { LoginWithEmailUseCase } from './domain/usecases/loginWithEmail'
import { LoginWithGoogleUseCase } from './domain/usecases/loginWithGoogle'
import { LogoutUseCase } from './domain/usecases/logout'
import { RegisterWithEmailUseCase } from './domain/usecases/registerWithEmail'
import { GetLoginFactoryUseCase } from './domain/usecases/getLoginFactory'
import { GetRegisterFactoryUseCase } from './domain/usecases/getRegisterFactory'
import { GetResetPasswordFactoryUseCase } from './domain/usecases/getResetPasswordFactory'
import { ResetPasswordUseCase } from './domain/usecases/resetPassword'
import { UpdatePasswordUseCase } from './domain/usecases/updatePassword'
import { GetUpdatePasswordFactoryUseCase } from './domain/usecases/getUpdatePasswordFactory'

const authDataSource = new AuthFirebaseDataSource()

const authRepository = new AuthRepository(authDataSource)

export const LoginWithEmail = new LoginWithEmailUseCase(authRepository)
export const LoginWithGoogle = new LoginWithGoogleUseCase(authRepository)
export const Logout = new LogoutUseCase(authRepository)
export const RegisterWithEmail = new RegisterWithEmailUseCase(authRepository)
export const ResetPassword = new ResetPasswordUseCase(authRepository)
export const UpdatePassword = new UpdatePasswordUseCase(authRepository)
export const GetLoginFactory = new GetLoginFactoryUseCase()
export const GetRegisterFactory = new GetRegisterFactoryUseCase()
export const GetResetPasswordFactory = new GetResetPasswordFactoryUseCase()
export const GetUpdatePasswordFactory = new GetUpdatePasswordFactoryUseCase()
