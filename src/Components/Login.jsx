import React from 'react';
import { Button, Form, Input } from 'antd';
import logo from '../img/logo.png';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLoginUser } from '../redux/loginSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, data } = useSelector(state => state.user);
  const onFinish = (user) => {
    dispatch(fetchLoginUser(user))
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  };

  return (
    <div class='login'>
      <div class='login_content'>
      {status === 'loading' && <p>Загрузка...</p>}
      {status === 'succeeded' && navigate('/search')}
        <img class='login_logo' src={logo} width={60} height={60} alt='logo' />
        <p class='login_title title'>Вход</p>
        <Form name="basic" labelCol={{ span: 8 }} style={{ maxWidth: 600 }}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}>

          <Form.Item
            label="Логин"
            name="email"
            layout="vertical"
            rules={[
              {
                required: true,
                message: 'Пожалуйста, введите логин!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Пароль"
            name="password"
            layout="vertical"
            rules={[
              {
                required: true,
                message: 'Пожалуйста, введите пароль!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: 150 }}>
              Войти
            </Button>
          </Form.Item>
        </Form>
        <div>Нету аккаунта? <Link to="/">Sign Up!</Link></div>
      </div>
    </div>
  )
}

export default Login