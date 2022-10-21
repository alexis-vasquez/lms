import { AntDesignOutlined } from "@ant-design/icons"
import { Avatar as AntdAvatar } from "antd"
import React from 'react'

export const Avatar = () => {
  return (
    <AntdAvatar icon={<AntDesignOutlined />} size={100}/>
  )
}