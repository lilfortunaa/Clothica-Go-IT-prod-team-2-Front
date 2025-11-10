"use client"

import css from "./Footer.module.css"
import { Formik, Form, Field } from 'formik'

export default function Footer() {
    return <footer className={css.footer}>
        <div className={css.container}>
            <div className={css.containerFooter}>
                <div className={css.containerFooterFirst}>
                    <div className={css.footerFirstPartFirst}>
                        <a className={css.logoFooter} href="/">
                            <img
                            className={css.imgLogoFooter}
                            src='/CompanyLogoFooter.svg'
                                alt="logo"
                            ></img>
                        </a>
                        <div className={css.footerItemsNavList}>
                        <p className={css.footerItemsTitle}>Меню</p>
                        <ul className={css.footerNavList}>
                            <li className={css.footerNavItem}><a href="/">Головна</a></li>
                            <li className={css.footerNavItem}><a href="/">Товари</a></li>
                            <li className={css.footerNavItem}><a href="/">Категорії</a></li>
                            </ul>
                            </div>
                    </div>
                    <div className={css.footerFirstPartSecond}>
                        <Formik initialValues={{ email: "" }} onSubmit={(values) => { console.log(values) }}>
                            <Form className={css.footerForm}>
                                <div className={css.footerFormikForm}>
                                    <p className={css.footerPartThirdTitle}>Підписатися</p>
                                    <p className={css.footerPartThirdText}>Приєднуйтесь до нашої розсилки, щоб бути в курсі новин та акцій.</p>
                                    <div className={css.inputBtnWrap}>
                                    <Field className={css.fieldInput} as="input" type="email" name="email" placeholder="Введіть ваш email" pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"></Field>
                                        <button className={css.btnFooter} type="submit">Підписатися</button>
                                        </div>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
                <div className={css.containerFooterSecond}>
                    <p className={css.footerRights}>© 2025 Clothica. Всі права захищені.</p>
                    <div className={css.footerSocial}>
                        <ul className={css.socialListFooter}>
                            <li className={css.socialFooter}><a href="https://www.facebook.com/"><img src="/Facebook.svg" alt="Facebook" /></a></li>
                            <li className={css.socialFooter}><a href="https://www.instagram.com/"><img src="/Instagram.svg" alt="Instagram" /></a></li>
                            <li className={css.socialFooter}><a href="https://x.com/"><img src="/X.svg" alt="X" /></a></li>
                            <li className={css.socialFooter}><a href="https://www.youtube.com/"><img src="/Youtube.svg" alt="Youtube" /></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </footer>
}