import React, {useState, useRef} from 'react';
import {Table, Input, Button, Space} from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import Highlighter from "react-highlight-words";
import {Country, CountryItem, DataIndex} from "../../../models/country";
import {continentFilters} from "../../../helper/continentsFilters";

type CountriesTableProps = {
    countries: Country[]
}

type FilterProps = {
    setSelectedKeys: (selectedKeys: string[]) => void,
    selectedKeys: string[],
    confirm: () => void,
    clearFilters: () => void
}

export function CountriesTable({countries}: CountriesTableProps) {
    const inputEl = useRef(null);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');

    function getColumnSearchProps(dataIndex: DataIndex) {
        return ({
            filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}: FilterProps) => (
                <div style={{padding: 8}}>
                    <Input
                        ref={inputEl}
                        placeholder={`Search ${dataIndex}`}
                        value={selectedKeys[0]}
                        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        style={{width: 188, marginBottom: 8, display: 'block'}}
                    />
                    <Space>
                        <Button
                            type="primary"
                            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                            icon={<SearchOutlined/>}
                            size="small"
                            style={{width: 90}}
                        >
                            Search
                        </Button>
                        <Button onClick={() => handleReset(clearFilters)} size="small" style={{width: 90}}>
                            Reset
                        </Button>
                    </Space>
                </div>
            ),
            filterIcon: (filtered: boolean) => <SearchOutlined style={{color: filtered ? '#1890ff' : undefined}}/>,
            onFilter: (value: string | number | boolean, record: CountryItem): boolean =>
                record[dataIndex]
                    ? record[dataIndex].toString().toLowerCase().includes((value as string).toLowerCase())
                    : false,
            render: (text: string) =>
                searchedColumn === dataIndex ? (
                    <Highlighter
                        highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
                        searchWords={[searchText]}
                        autoEscape
                        textToHighlight={text ? text.toString() : ''}
                    />
                ) : (
                    text
                ),
        });
    }

    function handleSearch(selectedKeys: string[], confirm: () => void, dataIndex: string) {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    }

    function handleReset(clearFilters: () => void) {
        clearFilters();
        setSearchText('');
    }

    const columns = [
        {
            title: 'Country',
            dataIndex: 'name',
            key: 'name',
            sorter: (a: CountryItem, b: CountryItem) => b.name.localeCompare(a.name),
            ...getColumnSearchProps(DataIndex.name),
        },
        {
            title: 'ISO code',
            dataIndex: 'code',
            key: 'code',
            sorter: (a: CountryItem, b: CountryItem) => b.code.localeCompare(a.code),
            ...getColumnSearchProps(DataIndex.code),
        },
        {
            title: 'Flag',
            dataIndex: 'emoji',
            key: 'emoji',
            render: (text: string) => <span>{text}</span>
        },
        {
            title: 'Continent',
            dataIndex: 'continent',
            key: 'continent',
            sorter: (a: CountryItem, b: CountryItem) => b.continent.localeCompare(a.continent),
            filters: continentFilters,
            onFilter: (value: string | number | boolean, record: CountryItem) => record.continent.indexOf(value as string) === 0,
        },
    ];

    const data = countries.map((item) => {
        return {...item, continent: item.continent.name, key: item.code}
    });

    return <Table columns={columns} dataSource={data} pagination={{pageSize: 20}}/>
}
