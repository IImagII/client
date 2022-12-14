import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../../components/Button'
import { ContentWrapper } from '../../components/ContentWrapper'
import { Spinner } from '../../components/spinner'
import { getPlane } from '../../store/plane/planeSlice'

import styles from './PlanePage.module.css'

export const PlanePage = () => {
   const { plane, isLoading } = useSelector(state => state.reducer.plane)

   const navigate = useNavigate()
   const { id } = useParams()
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(getPlane(id))
   }, [dispatch, id])

   if (isLoading) {
      return <Spinner />
   }

   return (
      plane && (
         <ContentWrapper className={styles.plane}>
            <div className={styles.descContent}>
               <Button onClick={() => navigate(-1)} isBackButton={true}>
                  Назад
               </Button>
               <h1 className={styles.title}>{plane.name}</h1>
               <div className={styles.price}>{plane.price}</div>
               <Button containerClassName={styles.buyBtnContainer} onClick={() => navigate('/order')}>
                  Оформить заказ
               </Button>
               <p className={styles.desc}>{plane.description}</p>
            </div>
            <div className={styles.imageContent}>
               <img className={styles.image} src={plane.planeImage} alt='' />
            </div>
         </ContentWrapper>
      )
   )
}
