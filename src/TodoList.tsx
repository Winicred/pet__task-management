import {AppLayout} from "@/layouts";
import {InputField, TodoItems} from "@/components";
import {DeleteCompletedButton, CompleteAllButton} from "@/components/button";

/**
 * Base application component.
 */
export const TodoList = () => {
	return (
		<AppLayout>
			<div className="flex flex-col gap-6 max-w-1/2">
				<InputField />

				<div className="flex gap-3 w-full justify-between">
					<CompleteAllButton />
					<DeleteCompletedButton />
				</div>
			</div>

			<TodoItems />
		</AppLayout>
	)
}