import { TextField } from '@mui/material/';
import { Layout, Space } from 'antd';
import { Context } from 'components/context';
import { useContext } from 'react';
const { Header } = Layout;
const headerStyle = {
    textAlign: 'center',
    color: '#fff',
    height: 64,
    paddingInline: 50,
    lineHeight: '64px',
    backgroundColor: '#7dbcea',
    paddingTop: "5px",
};
export const HeaderLayout = () => {
    const { filter, onChangeFilter } = useContext(Context);
    return <Space
        direction="vertical"
        style={{
            width: '100%',
        }}
        size={[0, 48]}
    >
        <Layout><Header style={headerStyle}>  <div>
            <TextField label="Find note by name" id="outlined-basic" variant="outlined" type="text" value={filter} onChange={(e) => onChangeFilter(e.target.value)} /> </div></Header></Layout></Space>
}