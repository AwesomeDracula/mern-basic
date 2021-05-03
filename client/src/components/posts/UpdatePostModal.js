import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useEffect, useState } from 'react'
import { PostContext } from '../../contexts/PostContext'


const UpdatePostModal = () => {
  const { postState: {post} , showUpdatePostModal, setShowUpdatePostModal, updatePost, setShowToast} = useContext(PostContext)

  const [updatedPost, setUpdatedPost] = useState(post)

  useEffect(() => setUpdatedPost(post),[post])

  const { title, description, url, status } = updatedPost

  const onCloseDialog = () => {
    setShowUpdatePostModal(false)
  }

  const onUpdatedPostChange = (e) => {
    setUpdatedPost({
      ...updatedPost,
      [e.target.name]: e.target.value
    })
  }

  const onUpdatedPostSubmit = async (e) => {
    e.preventDefault()
    const response = await updatePost(updatedPost)
    const {success, message} = response
    setShowUpdatePostModal(false)
    setShowToast({show: true, message, type: success ? 'success' : 'danger'})
  }

  return (
    <Modal show={showUpdatePostModal} onHide={onCloseDialog}>
      <Modal.Header closeButton>
        <Modal.Title>
          Making progress?
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={onUpdatedPostSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Control type='text' placeholder='Title' name='title' required aria-describedby='title-help' value={title} onChange={onUpdatedPostChange}/>
            <Form.Text id='title-help' muted>Required</Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Control as='textarea' rows={3} type='text' placeholder='Description' name='description' value={description} onChange={onUpdatedPostChange}/>
          </Form.Group>
          <Form.Group>
            <Form.Control type='text' placeholder='Youtube tutorial URL' name='url' value={url} onChange={onUpdatedPostChange}/>
          </Form.Group>
          <Form.Group>
            <Form.Control as='select' type='text' name='status'  value={status} onChange={onUpdatedPostChange}>
              <option value='TO LEARN'>TO LEARN</option>
              <option value='LEARNING'>LEARNING</option>
              <option value='LEARNT'>LEARNT</option>
            </Form.Control>
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

export default UpdatePostModal
