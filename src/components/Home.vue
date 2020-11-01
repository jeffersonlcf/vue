<template>
    <div class="container">
        <div class="row justify-content-center my-3">
            <div class="col-md-8">
                <div class="card card-default">
                    <div class="card-header">Home</div> 

                    <div class="card-body">
                        <ol>
                            <li>
                                <router-link :to="{ name: 'search'}">Search</router-link>
                            </li>
                            <li>
                                <router-link :to="{ name: 'camera'}">Camera</router-link>
                            </li>
                            <li>
                                <router-link :to="{ name: 'ratings'}">Ratings</router-link>
                            </li>
                            <li>
                                <router-link :to="{ name: 'treelist'}">Tree List</router-link>
                            </li>
                        </ol>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>