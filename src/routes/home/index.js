import { h } from 'preact';
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'preact-router/match';
import {useEffect, useState} from "preact/hooks";
import { list_gateway, remove_gateway, close_modal_error } from '../../store/actions';
import ErrorModal from '../../components/errorModal';
import style from './style.css';

const Home = () =>{ 
	const dispatch = useDispatch();
	const gateways = useSelector(state => state.gateways)
	const error = useSelector(state => state.error)

	const removeGateway = ( _id ) =>{
		dispatch(remove_gateway(_id));
	}

	useEffect(() => {
		dispatch(list_gateway());
		
		return () => {};
	}, []);

	const list = gateways.map((value, index, key) => (
        <tr key={value._id}>
			<td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
				<a href={"/detail/" + value._id} class="underline"> {value.serial}</a>
			</td>
			<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{value.name}</td>
			<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{value.ipv4}</td>
			<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{value.devices.length}/10</td>
			<td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
				<a  href={"/gateway/" + value._id} class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" >Edit</a>
			</td>
			<td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
				<button type="button" onClick={() => removeGateway(value._id)} class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" >Remove</button>
			</td>
		</tr>
      )
	);

	const modal = error ? <ErrorModal closeModal={(status)=> dispatch(close_modal_error())}/> : null;

	return(
		<main>
			<div class="relative">
				{modal}
				<div class="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-4">
					<div class="sm:flex sm:items-center">
						<div class="sm:flex-auto">
							<h1 class="text-xl font-semibold text-gray-900">Gateways</h1>
							<p class="mt-2 text-sm text-gray-700">A list of all the gateways and their associated devices.</p>
						</div>
						<div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
							<Link href='/gateway' class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">Add gateway</Link>
						</div>
					</div>
					{
						gateways.length > 0 ? (

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
														<th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6"></th>
														<th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6"></th>
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

					) : (
							null
						) 
					}
					
				</div>
			</div>
		</main>	
	);
}

export default Home;