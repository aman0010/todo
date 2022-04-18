import { faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ReactElement } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Todo } from "./Home";

interface Props {
    todos: Todo[];
    updateTodoData: Function;
    deleteTodoData: Function;
    setModalData: Function;
    setShowModal: Function;
}

interface TodoProps {
    todo: Todo;
}

export default function TodoCards({
    todos,
    updateTodoData,
    deleteTodoData,
    setModalData,
    setShowModal,
}: Props): ReactElement {
    const getTodoData = (id: number) => {
        for (const data in todos) {
            if (id === todos[data].id) return todos[data];
        }
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

    const TodoCard = ({ todo }: TodoProps) => (
        <Card className="text-start">
            <Card.Header className="d-flex justify-content-between">
                <Card.Title
                    className={todo.completed ? "mb-0 text-decoration-line-through" : "mb-0"}
                >
                    {todo.title}
                </Card.Title>
                <input
                    aria-label="option 1"
                    type="checkbox"
                    className="form-check-input todo-checkbox"
                    checked={todo.completed}
                    onChange={(event) => onCompleteToggle(todo.id, event.target.checked)}
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
    );

    return (
        <>
            {todos.map((todo) => (
                <Row key={todo.id}>
                    <Col md={{ span: 6, offset: 3 }} className="my-3">
                        <TodoCard todo={todo} />
                    </Col>
                </Row>
            ))}
        </>
    );
}
