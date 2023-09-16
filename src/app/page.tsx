'use client'

import styles from './page.module.css'
import { Dispatch, SetStateAction, useState, useCallback, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { RxCross1 } from 'react-icons/rx'

export default function Home() {

  const [tasks, setTask]: [Array<string>, Dispatch<SetStateAction<string[]>>] = useState(['NextFlow'])
  const [taskTitle, setTaskTitle]: [string, Dispatch<SetStateAction<string>>] = useState('NextFlow')
  const [taskInput, setTaskInput]: [string, Dispatch<SetStateAction<string>>] = useState('')
  const [isToastVisible, setToastVisible]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)

  function handleOnDragEnd(result: any) {
    if (!result.destination) return
    const items = Array.from(tasks)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    setTask(items)
  }

  const handleKeyPress = useCallback((event: any) => {
    const keyPressed: string = event.key.toLowerCase()
    switch (keyPressed) {
      case "n":
        setToastVisible((current) => !current)
        break;
      case "escape":
        if (isToastVisible) setToastVisible((current) => !current)
        break;
      default:
        break;
    }
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleKeyPress])


  function AddToList(item: string) {
    if (item.trim() && !tasks.includes(item)) {
      setTask([...tasks, item])
    }
  }

  return (
    <>
      {isToastVisible ?
        <div className={styles.toastOverlay}>
          <div className={styles.toast}>
            <RxCross1 className={styles.toastClose} onClick={() => setToastVisible(false)}/>
            <h1>New task...</h1>
            <form onSubmit={(e) => { e.preventDefault(); AddToList(taskInput) }}>
              <input type="text" placeholder='Task title...' className={styles.toastInput} maxLength={20} value={taskInput} onChange={(e) => setTaskInput(e.target.value)}/>
              <input type="submit" value=">" />
            </form>
          </div>
        </div> : null
        }
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
