'use client'

import styles from './page.module.css'
import { Dispatch, SetStateAction, useState, useCallback, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

export default function Home() {

  const [tasks, setTask]: [Array<string>, Dispatch<SetStateAction<string[]>>] = useState(['Test 1', 'Test 2', 'Test 3'])
  const [taskTitle, setTaskTitle]: [string, Dispatch<SetStateAction<string>>] = useState('NextFlow')

  function handleOnDragEnd(result: any) {
    if (!result.destination) return
    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTask(items)
  }

  return (
    <>
      <header className={styles.header}>
        <a href='https://github.com/furyforev3r/nextflow'><h1>NextFlow</h1></a>
      </header>
      <main className={styles.main}>
       <input type="text"className={styles.tasksTitle} maxLength={20} value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)}/>
       <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="characters">
          {(provided) => (
              <ul className={styles.taksContainer} {...provided.droppableProps} ref={provided.innerRef}>
                    {tasks.map((value: string, index: number) => {
                        return (
                          <Draggable key={value} draggableId={value} index={index}>
                            {(provided: any) => (
                                <li className={styles.task} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                  <p>{value}</p>
                                </li>
                              )
                            }
                          </Draggable>)
                      })
                    }
                    {provided.placeholder}
                </ul>
              )
            }
          </Droppable>
        </DragDropContext>
      </main>
    </>
  )
}
