import React, { useEffect, useState, ReactElement } from "react";
import { Button, Form, FormControl, FormGroup, FormLabel, Modal } from "react-bootstrap";

import { Todo } from "./Home";

interface Props {
    todo: Todo;
    show: boolean;
    setShow: Function;
    createTodo: Function;
    updateTodo: Function;
}

export default function TodoModal({
    todo,
    show,
    setShow,
    createTodo,
    updateTodo,
}: Props): ReactElement {
    const [id, setId] = useState(-1);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [completed, setCompleted] = useState(false);
    const handleClose = () => setShow(false);

    useEffect(() => {
        setId(todo.id);
        setTitle(todo.title);
        setDescription(todo.description ? todo.description : "");
        setCompleted(todo.completed);
    }, [todo]);

    const onSaveClick = () => {
        updateTodo(id, { id, title, description, completed });
        handleClose();
    };

    const onAddClick = () => {
        createTodo({ title, description, completed });
        handleClose();
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{id === -1 ? "Add" : "Edit"} Todo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <FormGroup className="mb-2">
                            <FormLabel>Title</FormLabel>
                            <FormControl
                                value={title}
                                onChange={(event) => {
                                    setTitle(event.target.value);
                                }}
                            />
                        </FormGroup>
                        <FormGroup className="mb-2">
                            <FormLabel>Title</FormLabel>
                            <FormControl
                                as="textarea"
                                value={description}
                                onChange={(event) => {
                                    setDescription(event.target.value);
                                }}
                            />
                        </FormGroup>
                        <FormGroup className="mb-2 d-flex align-items-center">
                            <FormLabel className="m-0 me-2">Completed</FormLabel>
                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={completed}
                                onChange={(event) => {
                                    setCompleted(event.target.checked);
                                }}
                                style={{ width: "25px", height: "25px" }}
                            />
                        </FormGroup>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {id === -1 ? (
                        <Button variant="primary" onClick={onAddClick}>
                            Add
                        </Button>
                    ) : (
                        <Button variant="primary" onClick={onSaveClick}>
                            Save Changes
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>
        </>
    );
}
