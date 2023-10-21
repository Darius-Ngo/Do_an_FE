import { Affix } from "antd"

const ListCategory = ({
  categorySelected,
  setCategorySelected,
  listCategory,
}) => {
  return (
    <Affix
      offsetTop={8}
      target={() => document.getElementById("body-admin-scroll")}
    >
      <div className="wrap-left">
        <div className="fs-18 fw-600 mb-16 pl-8 pr-8">Danh sách danh mục</div>
        <div className="list-left">
          {listCategory.map(i => (
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
      </div>
    </Affix>
  )
}

export default ListCategory
