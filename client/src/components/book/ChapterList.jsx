import React, { Component, Fragment, useEffect } from 'react';
import { Row, Col, Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ChapterList = ({
    chapters,
    bookid
}) => {
    return (
        <Table responsive>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Chapter #</th>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Created at</th>
                    <th>Last update</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {chapters.map(chapter =>
                    <tr key={chapters.indexOf(chapter) + 1}>
                        <td>{chapters.indexOf(chapter) + 1}</td>
                        <td>{chapter.number}</td>
                        <td><Link to={{
                            pathname: '/book/' + bookid + '/chapter/' + chapter._id,
                            state: { id: chapter._id }
                        }}>{chapter.name}</Link></td>
                        <td>{chapter.published ? "Publish" : "Not publish"}</td>
                        <td>{chapter.createdAt}</td>
                        <td>{chapter.updatedAt}</td>
                        <td><Button onClick={function () {
                            
                        }}>Read chapter</Button></td>
                    </tr>)
                }
            </tbody>
        </Table>
    );
}

export default ChapterList;