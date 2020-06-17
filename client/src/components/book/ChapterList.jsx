import React, {  useState, useEffect } from 'react';
import {  Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../Spinner';


const ChapterList = ({
    bookid
}) => {
    const [chapters, setChapters] = useState(null);

    const getChapters = async (bookid) => {
        try {
            const { data } = await axios.get('api/books/' + bookid + '/chapters', {
                params: {
                    published: true
                }
            });
            if (!data.success) return null;
            return data.chapters;
        }
        catch (err) {
            console.error(err);
            throw err;
        }
    }

    useEffect(() => {
        const asyncFunc = async () => {
            const chaps = await getChapters(bookid);
            await setChapters(chaps);
        }
        asyncFunc();
    }, []);

    //console.log(chapters);
    if (!chapters) {
        return <Spinner />
    }

    return (
        <Table responsive style={{marginTop:'50px', border:'ridge', marginBottom: '50px'}}>
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
                            pathname: '/book/' + bookid + '/' + chapter._id,
                            state: { id: chapter._id }
                        }}>{chapter.name}</Link></td>
                        <td>{chapter.published ? "Publish" : "Not publish"}</td>
                        <td>{chapter.createdAt}</td>
                        <td>{chapter.updatedAt}</td>
                        <td><Link to={{
                            pathname: '/book/' + bookid + '/' + chapter._id,
                            state: { id: chapter._id }
                        }}><Button>Read chapter</Button></Link></td>
                    </tr>)
                }
            </tbody>
        </Table>
    );
}

export default ChapterList;