'use client';

import styles from './page.module.css'
import { Dispatch, SetStateAction, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import Task from '../components/tasks/tasks'

export default function Home() {

  const [tasks, setTask]: [Array<string>, Dispatch<SetStateAction<string[]>>] = useState(['Test', 'Test', 'Test'])
  const [taskTitle, setTaskTitle]: [string, Dispatch<SetStateAction<string>>] = useState('NextFlow')

  return (
    <>
      <header className={styles.header}>
        <a href='https://github.com/furyforev3r/nextflow'><h1>NextFlow</h1></a>
      </header>
      <main className={styles.main}>
       <input type="text"className={styles.tasksTitle} maxLength={20} value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)}/>
       <div className={styles.taksContainer}>
          {tasks.map((value: string) => <Task value={value}/>)}
        </div>
      </main>
    </>
  )
}
