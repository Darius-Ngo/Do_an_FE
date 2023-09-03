import { Affix, Spin } from "antd"
import React, { useState, useEffect } from "react"
import CategoryService from "src/services/CategoryService"

const ListCategory = ({ categorySelected, setCategorySelected }) => {
  const [listData, setListData] = useState([])
  const [loading, setLoading] = useState(false)
  const getList = async () => {
    try {
      setLoading(true)
      const res = await CategoryService.getListCategory({
        status: 1,
      })
      if (res.isError) return
      setListData(res.Object?.data)
      setCategorySelected(res.Object?.data[0])
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getList()
  }, [])
  return (
    <Affix
      offsetTop={8}
      target={() => document.getElementById("body-admin-scroll")}
    >
      <div className="wrap-left">
        <Spin spinning={loading}>
          <div className="fs-18 fw-600 mb-16 pl-8 pr-8">Danh sách danh mục</div>
          <div className="list-left">
            {listData.map(i => (
              <div
                key={i.id}
                className={`item-content max-line1 ${
                  i.id === categorySelected?.id ? "active" : ""
                }`}
                onClick={() => setCategorySelected(i)}
                title={i.ten_loai_san_pham}
              >
                {i.ten_loai_san_pham}
              </div>
            ))}
          </div>
        </Spin>
      </div>
    </Affix>
  )
}

export default ListCategory
