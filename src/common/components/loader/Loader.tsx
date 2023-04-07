import s from './Loader.module.css'

export const Loader = () => {
  return (
    <div className={s.loader_background}>
      <div className={s.loader} />
    </div>
  )
}
