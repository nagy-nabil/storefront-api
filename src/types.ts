export interface ModelBase<T, TDoc> {
    index(): Promise<TDoc[]>;
    show(id: string): Promise<TDoc>;
    createOne(arg: T): Promise<TDoc>;
    updateOne(id: string, arg: T): Promise<TDoc>;
    deleteOne(id: string): Promise<TDoc>;
}
export enum UserRole {
    ADMIN = 'admin',
    USER = 'user'
}
export interface User {
    firstName: string;
    lastName: string;
    password: string;
    role: UserRole;
}
export interface UserDoc extends User {
    id: string;
}
export interface Product {
    name: string;
    price: string;
    category: string;
}
export interface ProductDoc extends Product {
    id: string;
}
export enum OrderState {
    COMPLETE = 'complete',
    ACTIVE = 'active'
}
export interface Order {
    status: OrderState;
    user_id: string;
}
export interface OrderDoc extends Order {
    id: string;
}
export interface Category {
    name: string;
    description: string;
}
export interface CategoryDoc extends Category {
    id: string;
}
