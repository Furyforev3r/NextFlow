'use client'

import styles from './page.module.css'
import { Dispatch, SetStateAction, useState, useCallback, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { RxCross1 } from 'react-icons/rx'
import { FaTrashAlt } from 'react-icons/fa'
import { AiOutlinePlus, AiOutlineCheck } from 'react-icons/ai'
import toast, { Toaster } from 'react-hot-toast'
import Cookies from 'js-cookie'

export default function Home() {

  const saveTasksToCookies = (tasks: Array<string>, tasksTitle: string) => {
    Cookies.set('tasks', JSON.stringify(tasks))
    Cookies.set('tasksTitle', tasksTitle)
  }

  const [tasks, setTask]: [Array<string>, Dispatch<SetStateAction<string[]>>] = useState(() => {
    const savedTasks = Cookies.get('tasks')
    return savedTasks ? JSON.parse(savedTasks) : []
  })

  const [tasksTitle, setTasksTitle]: [string, Dispatch<SetStateAction<string>>] = useState(() => {
    const savedTitle = Cookies.get('tasksTitle')
    return savedTitle ? savedTitle : 'Nextflow'
  })

  useEffect(() => {
    saveTasksToCookies(tasks, tasksTitle)
  }, [tasks, tasksTitle])


  const [taskInput, setTaskInput]: [string, Dispatch<SetStateAction<string>>] = useState('')
  const [isToastVisible, setToastVisible]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(true)
  const [isOnFocus, setIsOnFocus]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)

  const notifySucess = () => toast.success('Task added.')
  const notifyFinished = () => toast.success('Task finished.')

  function handleOnDragEnd(result: any) {
    if (!result.destination) return
    const items = Array.from(tasks)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    setTask(items)
  }

  const handleKeyPress = useCallback((event: any) => {
    const keyPressed: string = event.key.toLowerCase()

    if (isOnFocus == false) {
      switch (keyPressed) {
        case "n":
            setToastVisible(true)
          break
        case "escape":
          setToastVisible(false)
          break
        default:
          break
      }
    }
  }, [isOnFocus])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleKeyPress])


  const AddToList = (item: string) => {
    if (item.trim() && !tasks.includes(item)) {
      notifySucess()
      setTask([...tasks, item])
    }
  }

  
  function RemoveFromList(textValue: string) {
    setTask(tasks.filter((i: string) => i !== textValue))
    notifyFinished()
  }

  return (
    <>
      <Toaster position='top-right' toastOptions={
        {
          duration: 1000,
          style: {
            background: '#1ed760',
            color: '#fff'
          }
      }}/>
      {isToastVisible ?
        <div className={styles.toastOverlay}>
          <div className={styles.toast}>
            <RxCross1 className={styles.toastClose} onClick={() => setToastVisible(false)}/>
            <h1 translate="no">New task...</h1>
            <form onSubmit={(e) => { e.preventDefault(); AddToList(taskInput) }}>
              <input type="text" placeholder='Task title...' className={styles.toastInput} maxLength={100} value={taskInput} onChange={(e) => setTaskInput(e.target.value)}/>
              <input type="submit" value=">" />
            </form>
          </div>
        </div> : null
      }
      <header className={styles.header}>
        <a href='https://github.com/furyforev3r/nextflow'><h1>NextFlow</h1></a>
      </header>
      <main className={styles.main}>
       <input type="text"className={styles.tasksTitle} maxLength={20} value={tasksTitle} onChange={(e) => setTasksTitle(e.target.value)} onFocus={(e) => setIsOnFocus(true)} onBlur={(e) => setIsOnFocus(false)}/>
       <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="characters">
          {(provided) => (
              <ul className={styles.taksContainer} {...provided.droppableProps} ref={provided.innerRef}>
                    {tasks.map((value: string, index: number) => {
                        if (value.trim()) return (
                          <Draggable key={value} draggableId={value} index={index}>
                            {(provided: any) => (
                                <li className={styles.task} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                  <p>{value}</p>
                                  <AiOutlineCheck size={28} className={styles.finishedIcon} onClick={() => RemoveFromList(value)}/>
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
        <div className={styles.iconsContainer}>
          <AiOutlinePlus size={28} className={styles.addIcon} onClick={() => setToastVisible(true)}/>
          <FaTrashAlt size={28} className={styles.trashIcon} onClick={() => setTask([''])}/>
        </div>
      </main>
    </>
  )
}
