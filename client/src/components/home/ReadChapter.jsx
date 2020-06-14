import React, { Component } from 'react';
import {Dropdown} from 'react-bootstrap';
import './Chapter.css'

export default class Comment extends Component {
    render() {
        return (
            <div class="container" className="bookScreen" style={{ marginTop: '50px' }}>
                <Dropdown>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                        Choose chapter
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="#/Chapter-1">Chapter 1</Dropdown.Item>
                        <Dropdown.Item href="#/Chapter-2">Chapter 2</Dropdown.Item>
                        <Dropdown.Item href="#/Chapter-3">Chapter 3</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <div class="image-container set-full-height" className="bookScreen"></div>
                <div className="readingArea" >
                    abcabcaboscaojcvbaojsbvojasbvoabvoabvojb
                    abcabcaboscaojcvbaojsbvojasbvoabvoabvojb
                    abcabcaboscaojcvbaojsbvojasbvoabvoabvojb
                    abcabcaboscaojcvbaojsbvojasbvoabvoabvojb
                    abcabcaboscaojcvbaojsbvojasbvoabvoabvojb
                    abcabcaboscaojcvbaojsbvojasbvoabvoabvojb

                    abcabcaboscaojcvbaojsbvojasbvoabvoabvojb
                    abcabcaboscaojcvbaojsbvojasbvoabvoabvojb

                    abcabcaboscaojcvbaojsbvojasbvoabvoabvojb
                    abcabcaboscaojcvbaojsbvojasbvoabvoabvojb

                    abcabcaboscaojcvbaojsbvojasbvoabvoabvojb
                    abcabcaboscaojcvbaojsbvojasbvoabvoabvojb

                    abcabcaboscaojcvbaojsbvojasbvoabvoabvojb
                    abcabcaboscaojcvbaojsbvojasbvoabvoabvojb
                    abcabcaboscaojcvbaojsbvojasbvoabvoabvojb

                    abcabcaboscaojcvbaojsbvojasbvoabvoabvojb

               </div>
            </div>

        )
    }
}