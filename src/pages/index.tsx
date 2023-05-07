import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

export default function Home() {
  const [items, setItems]: any = useState([])
  const [inputText, setInputText] = useState("")


  function AddToList(item: string) {
    if (item.trim()) {
      setItems([...items, { content: item }])
    }
  }

  function onDragEnd(result: any) {
    if (!result.destination) {
      return
    }

    const itemsCopy = [...items]
    const [reorderedItem] = itemsCopy.splice(result.source.index, 1)
    itemsCopy.splice(result.destination.index, 0, reorderedItem)

    setItems(itemsCopy)
  }

  return (
    <>
      <Head>
        <title>NextFlow</title>
        <meta name="description" content="Created by https://github.com/FuryForev3r" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <h1>NextFlow</h1>
      </header>
      <main className={styles.main}>
        <div className={styles.container}>
          <h2 contentEditable={true}>NextFlow</h2>
          <form onSubmit={(e) => { e.preventDefault(); AddToList(inputText) }}>
            <input type="text" placeholder='Add to list...' onChange={(e) => { setInputText(e.target.value) }} />
            <input type="submit" value='>' />
          </form>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId='item'>
              {(provided: any) => (
                <ul className={styles.ItemsContainer} {...provided.droppableProps} ref={provided.innerRef}>
                  {items.map((item: any, index: any) => {
                    const itemId = index + 1
                    return (
                      <Draggable key={itemId.toString()} draggableId={itemId.toString()} index={index}>
                        {(provided: any) => (
                          <li className={styles.item} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}  {...provided.placeholder}>
                            <p className={styles.itemId}>{itemId}.</p>
                            <p>{item.content}</p>
                          </li>
                        )}
                      </Draggable>
                    )
                  })}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </main>
    </>
  )
}
