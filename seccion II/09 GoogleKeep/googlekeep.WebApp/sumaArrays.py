arr = [1, 3, 6, 2, 7];
buscar =[]

for i in range(len(arr)):
    for j in range(i+1, len(arr)):
        if arr[i] + arr[j] == 9:
            buscar.append(([i], [j]))
        for n in range(j+1, len(arr)):
            if arr[i] + arr[j] + arr[n] == 9:
                buscar.append(([i], [j], [n]))
            
print (buscar)

# output [[2], [3]] position

