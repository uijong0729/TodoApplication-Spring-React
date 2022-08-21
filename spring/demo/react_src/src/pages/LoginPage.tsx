import { BlueButton } from '../components/button/BlueButton';
import { useTodos } from '../hooks/useTodos';
import { LoginInput } from '../components/input/LoginInput';

export const LoginPage = () => {
    const { todoEntities, getAllTodos, addTodo} = useTodos();
    const onClickLoad = () => getAllTodos();
    const onAddTodo = () => addTodo();

    return (
        <div>
            <BlueButton onClick={onAddTodo}>TODO 추가</BlueButton>
            {todoEntities.map((todos) => (
                <p>{todos.id} {todos.text} {todos.text} {todos.assignedUserId} {todos.registrantId}</p>
            ))}
            <BlueButton onClick={onClickLoad}>TODO 로드</BlueButton>
        </div>
    )
}