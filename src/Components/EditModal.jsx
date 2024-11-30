import React from 'react';
import { Modal, Form, Input, Select, Col, Slider, InputNumber, Row, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setTitle, setMaxResults, setOrder, setSelectedRequest } from '../redux/modalSlice';

const { Option } = Select;

const EditModal = ({ onCancel, onSubmit }) => {
  const dispatch = useDispatch();
  const { modalData, isOpen } = useSelector(state => state.modal);
  
  return (
    <Modal
      open={isOpen}
      title={<div style={{ textAlign: 'center' }}>Изменить запрос</div>}
      onCancel={onCancel}
      footer={null}
    >
      <Form
        layout='vertical'
        initialValues={{ request: modalData.request, title: modalData.title, order: modalData.order, maxResult: modalData.maxResults }}
        onFinish={onSubmit}
      >
        <Form.Item label='Запрос' name='request'>
          <Input value={modalData.request} onChange={(event) => dispatch(setSelectedRequest(event.target.value))} />
        </Form.Item>
        <Form.Item
          label='Название'
          name='title'
          rules={[{ required: true, message: 'Пожалуйста, введите название запроса!' }]}
        >
          <Input value={modalData.title} onChange={(event) => dispatch(setTitle(event.target.value))} />
        </Form.Item>

        <Form.Item label='Сортировать по' name='select' initialValue={modalData.order} >
          <Select value={modalData.order} onChange={(value) => dispatch(setOrder(value))}>
            <Option value='relevance'>Без сортировки</Option>
            <Option value='date'>По дате</Option>
            <Option value='rating'>По рейтингу</Option>
            <Option value='title'>По алфавитному порядку</Option>
            <Option value='viewCount'>По количеству просмотров</Option>
          </Select>
        </Form.Item>

        <Form.Item label='Максимальное количество' initialValue={modalData.maxResults}>
          <Row>
            <Col span={12}>
              <Slider
                min={1}
                max={50}
                onChange={(value) => dispatch(setMaxResults(value))}
                value={modalData.maxResults}
              />
            </Col>
            <Col span={4}>
              <InputNumber
                min={1}
                max={50}
                style={{ margin: '0 16px' }}
                value={modalData.maxResults}
                onChange={(value) => dispatch(setMaxResults(value))}
              />
            </Col>
          </Row>
        </Form.Item>

        <Form.Item style={{ textAlign: 'center', marginTop: '40px' }}>
          <Button onClick={onCancel} style={{ width: 150, marginRight: '40px' }}>
            Не изменять
          </Button>
          <Button type='primary' htmlType='submit' style={{ width: 150 }}>
            Изменить
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditModal;