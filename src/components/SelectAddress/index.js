import { Col, Form, Row, Select } from "antd"
import { useEffect, useState, forwardRef, useImperativeHandle } from "react"
import FlSelect from "src/components/FloatingLabel/Select"
import RegionService from "src/services/RegionService"
import GuestServices from "src/services/GuestService"
import styled from "styled-components"

const { Option } = Select

const Styled = styled.div`
  .ant-select-selection-placeholder {
    z-index: 10;
  }
`
const SelectAddress = forwardRef(
  (
    {
      nameID,
      form,
      initValue,
      onBeforeLoading = () => {},
      onLoadingSuccuss = () => {},
      floating = true,
      required = true,
      isGuest = false,
      readOnly = false,
      listFormName = ["provinceId", "districtId", "wardId"],
    },
    ref,
  ) => {
    const provinceId = listFormName[0] || "provinceId"
    const districtId = listFormName[1] || "districtId"
    const wardId = listFormName[2] || "wardId"
    const [listProvince, setListProvince] = useState()
    const [listDistrict, setListDistrict] = useState()
    const [listWard, setlistWard] = useState()
    const [selected, setSelected] = useState({
      province: {},
      district: {},
      ward: {},
    })
    useImperativeHandle(
      ref,
      () => {
        return {
          address: selected,
        }
      },
      [selected],
    )

    useEffect(() => {
      getListProvinceVN()
      return () => {
        form.resetFields()
      }
    }, [])

    useEffect(() => {
      if (
        initValue?.[provinceId] &&
        listProvince?.length &&
        !selected?.province?.key
      ) {
        const province = listProvince?.find(
          i => i?.RegionID === initValue?.[provinceId],
        )
        setSelected(pre => ({
          ...pre,
          province: {
            key: province?.ParentID,
            value: province?.ParentID,
            children: province?.RegionName,
          },
        }))
      }
      if (
        initValue?.[districtId] &&
        listDistrict?.length &&
        !selected?.district?.key
      ) {
        const district = listDistrict?.find(
          i => i?.RegionID === initValue?.[districtId],
        )
        setSelected(pre => ({
          ...pre,
          district: {
            key: district?.ParentID,
            value: district?.ParentID,
            children: district?.RegionName,
          },
        }))
      }

      if (initValue?.[provinceId] && listWard?.length && !selected?.ward?.key) {
        const ward = listWard?.find(i => i?.RegionID === initValue?.[wardId])
        setSelected(pre => ({
          ...pre,
          ward: {
            key: ward?.ParentID,
            value: ward?.ParentID,
            children: ward?.RegionName,
          },
        }))
      }
    }, [initValue, listProvince, listDistrict, listWard])

    useEffect(() => {
      if (initValue?.[provinceId]) onChangeProvince(initValue?.[provinceId])
      if (initValue?.[districtId]) onChangeDistrict(initValue?.[districtId])
      if (initValue?.[provinceId])
        form?.setFieldsValue({
          [provinceId]: !!initValue?.[provinceId]
            ? initValue?.[provinceId]
            : undefined,
          [districtId]: !!initValue?.[districtId]
            ? initValue?.[districtId]
            : undefined,
          [wardId]: !!initValue?.[wardId] ? initValue?.[wardId] : undefined,
        })
    }, [initValue])

    const getListProvinceVN = () => {
      onBeforeLoading()
      let Apis = isGuest ? GuestServices : RegionService
      Apis.getByRegionId({ regionId: 234 })
        .then(res => {
          if (res?.isError) return
          setListProvince(res?.Object)
        })
        .finally(onLoadingSuccuss)
    }

    const onChangeProvince = (e, province) => {
      form.resetFields([districtId, wardId])
      if (!e) return setListDistrict([])
      setSelected(pre => ({ ...pre, province }))
      onBeforeLoading()
      let Apis = isGuest ? GuestServices : RegionService
      Apis.getByRegionId({ regionId: e })
        .then(res => {
          if (res?.isError) return
          const lstDistrict = res?.Object?.filter(i => i.ParentID === e)
          setListDistrict(lstDistrict)
        })
        .finally(onLoadingSuccuss)
    }

    const onChangeDistrict = (e, district) => {
      form.resetFields([wardId])
      if (!e) return setlistWard([])
      setSelected(pre => ({ ...pre, district }))

      onBeforeLoading()
      let Apis = isGuest ? GuestServices : RegionService
      Apis.getByRegionId({ regionId: e })
        .then(res => {
          if (res?.isError) return
          const lstWard = res?.Object?.filter(i => i.ParentID === e)
          setlistWard(lstWard)
        })
        .finally(onLoadingSuccuss)
    }

    const onChangeWard = (e, ward) => setSelected(pre => ({ ...pre, ward }))
    return (
      <Styled>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8} id={`${nameID}provinceFixScroll`}>
            <Form.Item
              name={provinceId}
              rules={
                required && [
                  { required: true, message: "Thông tin không được để trống" },
                ]
              }
              required={required}
              label={!floating && " Chọn Tỉnh/Thành phố "}
            >
              <FlSelect
                getPopupContainer={() =>
                  document.getElementById(`${nameID}provinceFixScroll`)
                }
                maxTagCount="responsive"
                showSearch
                allowClear={!required}
                isRequired={required}
                placeholder={!floating && " Chọn Tỉnh/Thành phố "}
                onChange={onChangeProvince}
                style={{ width: "100%" }}
                label={!!floating && " Chọn Tỉnh/Thành phố "}
                readOnly={readOnly}
              >
                {listProvince?.length &&
                  listProvince?.map(i => (
                    <Option key={i.RegionID} value={i.RegionID}>
                      {i.RegionName}
                    </Option>
                  ))}
              </FlSelect>
            </Form.Item>
          </Col>

          <Col xs={24} md={8} id={`${nameID}districtFixScroll`}>
            <Form.Item
              name={districtId}
              rules={
                required && [
                  { required: true, message: "Thông tin không được để trống" },
                ]
              }
              label={!floating && " Chọn Quận/Huyện "}
              required={required}
            >
              <FlSelect
                getPopupContainer={() =>
                  document.getElementById(`${nameID}districtFixScroll`)
                }
                maxTagCount="responsive"
                showSearch
                allowClear={!required}
                isRequired={required}
                placeholder={!floating && " Chọn Quận/Huyện "}
                onChange={onChangeDistrict}
                style={{ width: "100%" }}
                label={!!floating && " Chọn Quận/Huyện "}
                readOnly={readOnly}
              >
                {listDistrict?.length &&
                  listDistrict?.map(i => (
                    <Option key={i.RegionID} value={i.RegionID}>
                      {i.RegionName}
                    </Option>
                  ))}
              </FlSelect>
            </Form.Item>
          </Col>

          <Col xs={24} md={8} id={`${nameID}wardFixScroll`}>
            <Form.Item
              name={wardId}
              rules={
                required && [
                  {
                    required: true,
                    message: "Thông tin không được để trống",
                  },
                ]
              }
              label={!floating && " Chọn Phường/Xã "}
              required={required}
            >
              <FlSelect
                getPopupContainer={() =>
                  document.getElementById(`${nameID}wardFixScroll`)
                }
                maxTagCount="responsive"
                showSearch
                allowClear={!required}
                placeholder={!floating && " Chọn Phường/Xã "}
                isRequired={required}
                onChange={onChangeWard}
                style={{ width: "100%" }}
                label={!!floating && " Chọn Phường/Xã "}
                readOnly={readOnly}
              >
                {listWard?.length &&
                  listWard?.map(i => (
                    <Option key={i.RegionID} value={i.RegionID}>
                      {i.RegionName}
                    </Option>
                  ))}
              </FlSelect>
            </Form.Item>
          </Col>
        </Row>
      </Styled>
    )
  },
)

export default SelectAddress
