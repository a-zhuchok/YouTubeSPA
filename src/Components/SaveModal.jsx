import React, {useState} from 'react';
import { Modal, Form, Input, Select, Slider, InputNumber, Row, Col, Button } from 'antd';

const { Option } = Select;

const SaveModal = ({ visible, title, onClose, onFinish,  setTitle, onFinishFailed, searchText, inputValue, setInputValue, selectedValue, setSelectedValue }) => {

    const handleSliderChange = (value) => {
        setInputValue(value);
    };

    const handleSelectChange = (value) => {
        setSelectedValue(value);
    };
console.log(title)
    return (
        <Modal
            open={visible}
            title={<div style={{ textAlign: 'center' }}>Сохранить запрос</div>}
            onCancel={onClose}
            footer={null}
        >
            <Form
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item label="Запрос" name="request">
                    <Input placeholder={searchText} disabled />
                </Form.Item>

                <Form.Item
                    label="Название"
                    name="title"
                    rules={[{ required: true, message: 'Пожалуйста, введите название запроса!' }]}
                >
                    <Input placeholder="Укажите название" initialValue={title}  />
                </Form.Item>

                <Form.Item label="Сортировать по" name="select" initialValue={selectedValue}>
                    <Select value={selectedValue} onChange={handleSelectChange}>
                        <Option value="relevance">Без сортировки</Option>
                        <Option value="date">По дате</Option>
                        <Option value="rating">По рейтингу</Option>
                        <Option value="title">По алфавитному порядку</Option>
                        <Option value="viewCount">По количеству просмотров</Option>
                    </Select>
                </Form.Item>

                <Form.Item label="Максимальное количество" initialValue={inputValue}>
                    <Row>
                        <Col span={12}>
                            <Slider
                                min={1}
                                max={50}
                                onChange={handleSliderChange}
                                value={typeof inputValue === 'number' ? inputValue : 0}
                            />
                        </Col>
                        <Col span={4}>
                            <InputNumber
                                min={1}
                                max={50}
                                style={{ margin: '0 16px' }}
                                value={inputValue}
                                onChange={handleSliderChange}
                            />
                        </Col>
                    </Row>
                </Form.Item>

                <Form.Item style={{ textAlign: 'center', marginTop: '40px' }}>
                    <Button onClick={onClose} style={{ width: 150, marginRight: '40px', color: '#1677ff' }}>
                        Не сохранять
                    </Button>
                    <Button type="primary" htmlType="submit" style={{ width: 150 }}>
                        Сохранить
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default SaveModal;