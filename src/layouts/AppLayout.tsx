import {ReactNode} from "react";

/**
 * Layout for the app.
 *
 * @param children - The children to display in the layout.
 */
export const AppLayout = ({children}: {children: ReactNode}) => {
	return (
		<div className="w-screen h-screen flex flex-col items-center justify-center bg-neutral-900">
			<h1 className="mb-24 text-3xl text-neutral-100 font-semibold">To-Do list</h1>

			{children}
		</div>
	)
}