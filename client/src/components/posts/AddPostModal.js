import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState } from 'react'
import { PostContext } from '../../contexts/PostContext'


const AddPostModal = () => {
  const {showAddPostModal, setShowAddPostModal, addPost, setShowToast} = useContext(PostContext)

  const [newPost, setNewPost] = useState({
    title: '',
    description: '',
    url: '',
    status: 'TO LEARN'
  })

  const { title, description, url, status } = newPost

  const onCloseDialog = () => {
    setNewPost({
      title: '',
      description: '',
      url: '',
      status: 'TO LEARN'
    })
    setShowAddPostModal(false)
  }

  const onAddPostChange = (e) => {
    setNewPost({
      ...newPost,
      [e.target.name]: e.target.value
    })
  }

  const onAddPostSubmit = async (e) => {
    e.preventDefault()
    const response = await addPost(newPost)
    const {success, message} = response
    setNewPost({
      title: '',
      description: '',
      url: '',
      status: 'TO_LEARN'
    })
    setShowAddPostModal(false)
    setShowToast({show: true, message, type: success ? 'success' : 'danger'})
  }

  return (
    <Modal show={showAddPostModal} onHide={onCloseDialog}>
      <Modal.Header closeButton>
        <Modal.Title>
          What do you want to learn?
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={onAddPostSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Control type='text' placeholder='Title' name='title' required aria-describedby='title-help' value={title} onChange={onAddPostChange}/>
            <Form.Text id='title-help' muted>Required</Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Control as='textarea' rows={3} type='text' placeholder='Description' name='description' value={description} onChange={onAddPostChange}/>
          </Form.Group>
          <Form.Group>
            <Form.Control type='text' placeholder='Youtube tutorial URL' name='url'  value={url} onChange={onAddPostChange}/>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={onCloseDialog}>Cancel</Button>
          <Button variant='primary' type='submit'>Learn It!</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default AddPostModal
