<template>
	<div class="container">
		<table>
			<thead>
				<tr>
					<th>Sun</th>
					<th>Mon</th>
					<th>Tue</th>
					<th>Wed</th>
					<th>Thu</th>
					<th>Fri</th>
					<th>Sat</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td colspan="1" />
					<td>1</td>
					<td>2</td>
					<td>3</td>
					<td>4</td>
					<td>5</td>
					<td>6</td>
				</tr>
				<tr>
					<td>7</td>
					<td>8</td>
					<td class="marked">
						9
					</td>
					<td>10</td>
					<td>11</td>
					<td>12</td>
					<td>13</td>
				</tr>
				<tr>
					<td>14</td>
					<td>15</td>
					<td>16</td>
					<td>17</td>
					<td>18</td>
					<td class="marked">
						19
					</td>
					<td>20</td>
				</tr>
				<tr>
					<td>21</td>
					<td class="marked">
						22
					</td>
					<td>23</td>
					<td>24</td>
					<td>25</td>
					<td>26</td>
					<td>27</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
export default {
	name: 'Calendar'
}
</script>

<style scoped lang="scss">

table{
	width: 100%;
	height: 100%;
}
.container {
  border-radius: 15px;
  box-shadow: 8px 8px 8px #d0d3d4, -0.6em 0 0.8em #f8f9f9;
  padding: 15px;
  display: inline-block; /*NP*/
 justify-content: center;
 align-items: center;
  min-height: 13rem;
}

th,
tr,
td {
  width: 2rem;
  height: 2rem;
  text-align: center;
}

td {
  padding: 7px;
  margin: 2px;
  cursor: pointer;
}

tr {
  padding-top: 8px;
  padding-bottom: 8px;
}

th {
  font-weight: 600;
}

.marked {
  background-color: $color-primary;
  color: #fff;
  border-radius: 6px;
   width: 24px;
  height: 24px;
  box-shadow: 2px 2px 2px #a6acaf, -1em 0 0.8em #f8f9f9;
}
</style>
