from itertools import combinations

arr = [1, 3, 6, 2, 7]
objetivo = 9


indices = range(len(arr))


combinaciones_2 = combinations(indices, 2)
combinaciones_3 = combinations(indices, 3)


es_objetivo = lambda idxs: sum(arr[i] for i in idxs) == objetivo


buscar = list(filter(es_objetivo, combinaciones_2)) + \
        list(filter(es_objetivo, combinaciones_3))

print(buscar)