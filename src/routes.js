import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './layout/Main'
import { Homepage } from './pages/HomePage'
import { VimeoOTTCustomersPage } from './pages/VimeoOTTCustomersPage'

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />} path='/'>
        <Route element={<Homepage />} path='/' />
        <Route
          element={<VimeoOTTCustomersPage />}
          path='/vimeo-ott-customers'
        />
        {/* <Route element={<ProjectPage />} path='/project/:projectId' /> */}
      </Route>
    </Routes>
  )
}

export default AppRoutes
