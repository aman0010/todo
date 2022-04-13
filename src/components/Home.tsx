import React, { ReactElement, useEffect, useState } from "react";
import { faEdit, faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import TodoModal from "./TodoModal";

interface Todo {
    id: number;
    title: string;
    description?: string;
    completed: boolean;
}

export default function Home(): ReactElement {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [modalData, setModalData] = useState<Todo>({
        id: -1,
        title: "",
        description: "",
        completed: false,
    });
    const [showModal, setShowModal] = useState(false);
    const [firstLoad, setFirstLoad] = useState(true);

    useEffect(() => {
        const item = localStorage.getItem("todos");

        if (item) {
            setTodos(JSON.parse(item));
        }
        setFirstLoad(false);
    }, []);

    useEffect(() => {
        if (!firstLoad) localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos, firstLoad]);

    const createTodoData = (todo: { title: string; description?: string; completed: boolean }) => {
        const newID: number = todos[todos.length - 1] ? todos[todos.length - 1].id + 1 : 0;
        const newTodo: Todo = {
            id: newID,
            title: todo.title,
            description: todo.description,
            completed: todo.completed,
        };
        const newTodos: Todo[] = [...todos, newTodo];
        setTodos(newTodos);
    };

    const getTodoData = (id: number) => {
        for (const data in todos) {
            if (id === todos[data].id) return todos[data];
        }
    };

    const updateTodoData = (id: number, todo: Todo) => {
        const newTodo = todos.map((item) => {
            if (item.id === id) return todo;
            return item;
        });
        setTodos(newTodo);
    };

    const deleteTodoData = (id: number) => {
        setTodos(todos.filter((item) => item.id !== id));
    };

    const onCompleteToggle = (id: number, completed: boolean) => {
        if (
            !window.confirm(
                completed ? "Convert task to completed?" : "Convert task to incomplete?"
            )
        )
            return;

        const todo = getTodoData(id);
        if (todo) updateTodoData(id, { ...todo, completed: !todo?.completed });
    };

    const handleEditClick = (id: number) => {
        const todo = getTodoData(id);
        if (todo) setModalData(todo);
        setShowModal(true);
    };

    const handleDeleteClick = (id: number) => {
        if (window.confirm("Do you want to delete this task?")) {
            deleteTodoData(id);
        }
    };

    const handleAddClick = () => {
        setModalData({
            id: -1,
            title: "",
            description: "",
            completed: false,
        });
        setShowModal(true);
    };

    return (
        <Container className="my-4">
            <TodoModal
                show={showModal}
                setShow={setShowModal}
                todo={modalData}
                updateTodo={updateTodoData}
                createTodo={createTodoData}
            />

            <h3>Todo</h3>
            {todos.map((todo) => (
                <Row key={todo.id}>
                    <Col md={{ span: 6, offset: 3 }} className="my-3">
                        <Card className="text-start">
                            <Card.Header className="d-flex justify-content-between">
                                <Card.Title
                                    className={
                                        todo.completed
                                            ? "mb-0 text-decoration-line-through"
                                            : "mb-0"
                                    }
                                >
                                    {todo.title}
                                </Card.Title>
                                <input
                                    aria-label="option 1"
                                    type="checkbox"
                                    className="form-check-input todo-checkbox"
                                    checked={todo.completed}
                                    onChange={(event) =>
                                        onCompleteToggle(todo.id, event.target.checked)
                                    }
                                />
                            </Card.Header>
                            <Card.Body>
                                <Card.Text>{todo.description}</Card.Text>
                                <hr className="my-3" />
                                <div className="text-end">
                                    <FontAwesomeIcon
                                        icon={faEdit}
                                        size={"1x"}
                                        className="me-2 cursor-pointer"
                                        style={{ fontSize: "25px" }}
                                        onClick={() => handleEditClick(todo.id)}
                                    />
                                    <FontAwesomeIcon
                                        icon={faTrashCan}
                                        size={"2x"}
                                        className="text-danger cursor-pointer"
                                        style={{ fontSize: "25px" }}
                                        onClick={() => handleDeleteClick(todo.id)}
                                    />
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            ))}

            {todos.length < 1 && (
                <Col md={{ span: 6, offset: 3 }} className="my-3">
                    <Card className='p-3'>Click on the button on bottom right to add todo</Card>
                </Col>
            )}

            <Button className="btn-add" onClick={handleAddClick}>
                <FontAwesomeIcon icon={faPlus} size={"2x"} />
            </Button>
        </Container>
    );
}

export type { Todo };
