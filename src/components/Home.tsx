import React, { ReactElement, useEffect, useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Col, Container } from "react-bootstrap";
import TodoModal from "./TodoModal";
import TodoCards from "./TodoCards";

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

    const handleAddClick = () => {
        setModalData({
            id: -1,
            title: "",
            description: "",
            completed: false,
        });
        setShowModal(true);
    };

    const NoTodoMessage = () => (
        <>
            {todos.length < 1 && (
                <Col md={{ span: 6, offset: 3 }} className="my-3">
                    <Card className="p-3">Click on the button on bottom right to add todo</Card>
                </Col>
            )}
        </>
    );

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
            <TodoCards
                todos={todos}
                updateTodoData={updateTodoData}
                deleteTodoData={deleteTodoData}
                setModalData={setModalData}
                setShowModal={setShowModal}
            />

            <NoTodoMessage />

            <Button className="btn-add" onClick={handleAddClick}>
                <FontAwesomeIcon icon={faPlus} size={"2x"} />
            </Button>
        </Container>
    );
}

export type { Todo };
