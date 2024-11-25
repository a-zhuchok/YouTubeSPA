import React from 'react';
import { Modal, Form, Input, Select, Col, Slider, InputNumber, Row, Button } from 'antd';

const { Option } = Select;

const EditModal = ({ 
  open, 
  onCancel, 
  onSubmit, 
  requestValue, 
  nameRequest, 
  orderRequest, 
  maxResultRequest, 
  handleSelectChange, 
  handleSliderChange 
}) => {
  return (
    <Modal
      open={open}
      title={<div style={{ textAlign: 'center' }}>Изменить запрос</div>}
      onCancel={onCancel}
      footer={null}
    >
      <Form
        layout="vertical"
        initialValues={{ request: requestValue, title: nameRequest, order: orderRequest, maxResult: maxResultRequest }}
        onFinish={onSubmit}
      >
        <Form.Item label="Запрос" name="request">
          <Input value={requestValue} onChange={(e) => setRequestValue(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="Название"
          name="title"
          rules={[{ required: true, message: 'Пожалуйста, введите название запроса!' }]}
        >
          <Input value={nameRequest} onChange={(e) => setNameRequest(e.target.value)} />
        </Form.Item>

        <Form.Item label="Сортировать по" name="select" initialValue={orderRequest} >
          <Select value={orderRequest} onChange={handleSelectChange}>
            <Option value="relevance">Без сортировки</Option>
            <Option value="date">По дате</Option>
            <Option value="rating">По рейтингу</Option>
            <Option value="title">По алфавитному порядку</Option>
            <Option value="viewCount">По количеству просмотров</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Максимальное количество">
          <Row>
            <Col span={12}>
              <Slider
                min={1}
                max={50}
                onChange={handleSliderChange}
                value={typeof maxResultRequest === 'number' ? maxResultRequest : 0}
              />
            </Col>
            <Col span={4}>
              <InputNumber
                min={1}
                max={50}
                style={{ margin: '0 16px' }}
                value={maxResultRequest}
                onChange={handleSliderChange}
              />
            </Col>
          </Row>
        </Form.Item>
        
        <Form.Item style={{ textAlign: 'center', marginTop: '40px' }}>
          <Button onClick={onCancel} style={{ width: 150, marginRight: '40px' }}>
            Не изменять
          </Button>
          <Button type="primary" htmlType="submit" style={{ width: 150 }}>
            Изменить
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditModal;