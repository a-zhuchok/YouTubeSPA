import React from 'react';
import { Modal, Form, Input, Select, Slider, InputNumber, Row, Col, Button } from 'antd';
import { setTitle, setMaxResults, setOrder } from '../redux/modalSlice';
import { useDispatch, useSelector } from 'react-redux';

const { Option } = Select;

const SaveModal = ({ onClose, onFinish }) => {
    const dispatch = useDispatch();
    const { modalData, isOpen } = useSelector(state => state.modal);
    const { searchData } = useSelector(state => state.searchData);
    
    return (
        <Modal
            open={isOpen}
            title={<div style={{ textAlign: 'center' }}>Сохранить запрос</div>}
            onCancel={onClose}
            footer={null}
        >
            <Form
                layout='vertical'
                onFinish={onFinish}
            >
                <Form.Item label='Запрос' name='request'>
                    <Input placeholder={searchData.request} disabled />
                </Form.Item>

                <Form.Item
                    label='Название'
                    name='title'
                    rules={[{ required: true, message: 'Пожалуйста, введите название запроса!' }]}
                >
                    <Input placeholder='Укажите название' value={modalData.title}
                        onChange={(event) => dispatch(setTitle(event.target.value))} />
                </Form.Item>

                <Form.Item label='Сортировать по' name='select' initialValue={modalData.order}>
                    <Select onChange={(value) => dispatch(setOrder(value))}>
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
                                value={typeof modalData.maxResults === 'number' ? modalData.maxResults : 0}
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
                    <Button onClick={onClose} style={{ width: 150, marginRight: '40px', color: '#1677ff' }}>
                        Не сохранять
                    </Button>
                    <Button type='primary' htmlType='submit' style={{ width: 150 }}>
                        Сохранить
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default SaveModal;