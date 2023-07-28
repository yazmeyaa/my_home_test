import { makeAutoObservable } from "mobx"

export type ToastKinds = 'alert' | 'warning' | 'info'

export interface ToastProperties {
    id: string
    title?: string
    description: string
    kind: ToastKinds
}

export type ToastConstructorProps = Omit<ToastProperties, 'id'>

export class Toast implements ToastProperties {
    id: string
    title: string
    description: string
    kind: ToastKinds
    constructor(props: ToastConstructorProps) {
        const { title } = props

        this.id = `${Math.floor(Math.random() & 9)}${props.kind}_${Date.now()}` //* ex: 6alert_1690533249472 
        this.title = title ?? props.kind
        this.description = props.description
        this.kind = props.kind
    }
}

export class ToastStore {

    toastList: Toast[] = []

    constructor() {
        makeAutoObservable(this)
    }

    createToast(props: ToastConstructorProps) {
        this.toastList.push(new Toast(props))
    }

    removeToastById(id: string) {
        const newArray = this.toastList.filter(item => item.id !== id)
        this.toastList = newArray
    }

    removeAllToasts() {
        this.toastList = []
    }

}

export const toastStore = new ToastStore()