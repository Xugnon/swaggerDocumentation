import { User } from '../../model/User';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
    user_id: string;
}

class ListAllUsersUseCase {
    constructor(private usersRepository: IUsersRepository) {}

    execute({ user_id }: IRequest): User[] {
        const users = this.usersRepository.list();
        if (!user_id) {
            return users;
        }

        const verifyId = this.usersRepository.findById(user_id);
        if (!verifyId) {
            throw new Error('User not found');
        }

        const adm = verifyId.admin;
        if (!adm) {
            throw new Error('Only admin users can execute this request');
        }

        const user = users.filter(user => user.id === user_id);
        return user;
    }
}

export { ListAllUsersUseCase };
