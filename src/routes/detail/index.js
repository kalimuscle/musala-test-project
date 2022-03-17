import { h } from 'preact';
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'preact-router/match';
import {useEffect, useState} from "preact/hooks";
import { read_gateway, close_modal_error } from '../../store/actions';
import ErrorModal from '../../components/errorModal';
import style from './style.css';

const Detail = ({_id}) =>{
	const dispatch = useDispatch();
	const value = useSelector(state => state.gateway);
	const error = useSelector(state => state.error)

	useEffect(() => {
		dispatch(read_gateway(_id));
		
		return () => {};
	}, []);

	const list = value != null ? value.devices.map((item, index, key) => (
        <tr key={value.uid}>
			<td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{item.uid}</td>
			<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.vendor}</td>
			<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.date}</td>
			<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.status ? 'Online' : 'Offline'}</td>
		</tr>
      )
	) : null ;

	const modal = error ? <ErrorModal closeModal={(status)=> dispatch(close_modal_error())}/> : null;

	if(value != null){
		return(
			<main>
				{modal}
				<div class="relative">
					<div class="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-4">
						<div class="sm:flex sm:items-center">
							<div class="sm:flex-auto">
								<h1 class="text-xl font-semibold text-gray-900">Gateway: {value._id} </h1>
							</div>
						</div>
								<div class="mt-8 flex flex-col">
									<div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
										<div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
											<div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
												<table class="min-w-full divide-y divide-gray-300">
													<thead class="bg-gray-50">
														<tr>
															<th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Serial number</th>
															<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Name</th>
															<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Ipv4</th>
															<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"># Devices</th>
														</tr>
													</thead>
													<tbody class="bg-white">
														<tr key={value._id}>
															<td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
																{value.serial}
															</td>
															<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{value.name}</td>
															<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{value.ipv4}</td>
															<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{value.devices.length}/10</td>
														</tr>
													</tbody>
												</table>
											</div>
										</div>
									</div>
								</div>
						<div class="sm:flex sm:items-center">
							<div class="sm:flex-auto">
								<h1 class="text-xl mt-8 font-semibold text-gray-900">Devices: {value.devices.length}/10 </h1>
							</div>
						</div>
						<div class="px-4 sm:px-6 lg:px-8">
							<div class="mt-8 flex flex-col">
								<div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
									<div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
										<div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
											<table class="min-w-full divide-y divide-gray-300">
												<thead class="bg-gray-50">
													<tr>
														<th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">UID</th>
														<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Vendor</th>
														<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date  Created</th>
														<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
														
													</tr>
												</thead>
												<tbody class="bg-white">
													{list}
														
												</tbody>
											</table>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>	
		);
	}
	else{
		return(
			<div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
				<div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
					
					<div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

					
					<span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

					
					<div class="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
					<div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
						<div class="sm:flex sm:items-start">
						<div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
						
							<svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
							</svg>
						</div>
						<div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
							<h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">Gateway details not found</h3>
							<div class="mt-2">
							<p class="text-sm text-gray-500">Try to pick up other gateway from list</p>
							</div>
						</div>
						</div>
					</div>
					<div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
						
						<a href='/' class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Go to list</a>
					</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Detail;