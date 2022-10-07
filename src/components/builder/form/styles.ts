import styled from 'styled-components'

export const MainContainer = styled.div`
  border: 1px solid #d1d1d1;
  border-left: none !important;
  height: 100%;
  width: 100%;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
  padding-right: 0.3rem;
  padding-left: 0;
`

export const Sidebar = styled.aside`
  background-color: #f2f2f2;
  border-right: 2px solid #034EA2;
  height: 100%;
  width: 100%;
`

export const SidebarHeader = styled.div`
  background-color: #034EA2;
  padding: 0.5rem;
`

export const SidebarHeaderTitle = styled.h3`
  color: #FFF;
  font-size: 1rem;
  margin-bottom: 0;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  height: 100%;
  margin-bottom: 0 !important;
`

export const SidebarBody = styled.div`

`

export const SidebarBodyHeader = styled.div`
  display: flex;
  background-color: #e2e2e2;
`

export const SidebarBodyLanguageWrapper = styled.div`
  background-color: #f2f2f2;
  text-align: center;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
`

export const SidebarBodyHeaderTab = styled.div`
  width: 33.33%;
  border-right: 1px solid #f2f2f2;
  background-color: ${props => props.active ? "#FFF" : "#e2e2e2"};
  transition: background-color 0.2s ease-in-out;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  cursor: pointer;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  &:hover {
    background-color: ${props => props.active ? "#FFF" : "#efefef"};
  }
`

export const SidebarBodyContent = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  padding: 0.6rem;
  gap: 0.3rem;
  overflow-y: auto;
`

export const SidebarBodyListContent = styled.div`
  width: 100%;
  height: 100%;
  padding: 0.6rem;

  .input-label {
    font-size: 0.9rem;
    padding-left: 0.5rem;
    padding-bottom: 0.1rem;
    padding-top: 0.8rem;
  }
`

export const SidebarBodyFormElement = styled.div`
  height: 6rem;
  width: calc(50% - 0.3rem);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #FFF;
  border: 1px solid #a5a5a5;
  cursor: move;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`

export const FormBuilderDDWrapper = styled.div`
  height: 100%;

  .col-1, .col-2, .col-3, .col-4, .col-5, .col-6, .col-7, .col-8, .col-9, .col-10, .col-11, .col-12 {
    &:not(.tabs-wrapper-col) {
      border: ${props => props.isTabsLayoutActive ? "1px dashed green" : "none"};
    }
  }

  .ant-tabs.ant-tabs-top {
    width: 100%;
  }
`

export const NewFormItemWrapper = styled.div`
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  display: flex;
`