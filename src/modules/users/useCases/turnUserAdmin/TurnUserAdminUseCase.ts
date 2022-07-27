import { User } from '../../model/User';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
    user_id: string;
}

class TurnUserAdminUseCase {
    constructor(private usersRepository: IUsersRepository) {}

    execute({ user_id }: IRequest): User {
        const verifyId = this.usersRepository.findById(user_id);

        if (verifyId) {
            const user = this.usersRepository.turnAdmin(verifyId);

            return user;
        }

        throw new Error('User not found');
    }
}

export { TurnUserAdminUseCase };
