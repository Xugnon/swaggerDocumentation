import { User } from '../../model/User';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
    user_id: string;
}

class ListAllUsersUseCase {
    constructor(private usersRepository: IUsersRepository) {}

    execute({ user_id }: IRequest): User[] {
        const verifyId = this.usersRepository.findById(user_id);
        if (!verifyId) {
            throw new Error('User not found');
        }
        if (!verifyId.admin) {
            throw new Error('Only admin users can execute this request');
        }

        const user = this.usersRepository.list();
        return user;
    }
}

export { ListAllUsersUseCase };
