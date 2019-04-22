import * as React from 'react';
import { Layout } from 'antd';
import Routes from '../../routes';

const { Content } = Layout;

class Home extends React.Component {
  render() {
    return (
      <Layout>
        <Layout>
          <Content style={{ margin: '16px 12px', padding: 16, background: '#fff', minHeight: 520 }}>{Routes(true)}</Content>
        </Layout>
      </Layout>
    );
  }
}

export default Home;
