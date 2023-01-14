import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
import numpy as np

# set up the target position
target_x, target_y, target_z = 500, 0, 500


# define initial position, velocity, and acceleration
x, y, z = 0, 0, 0
vx, vy, vz = 0, 0, 50
ax, ay, az = 10, 0, 0

# -9.81 acceleration due to gravity

# define fuel burn rate and maximum range
fuel_burn_rate = 0.01
max_range = 10

# define time step
dt = 0.1

# initialize fuel level and time
fuel = 1
t = 0

# initialize empty lists to store the missile's position at each time step
positions_x = []
positions_y = []
positions_z = []


# simulate the flight
while fuel > 0 and t < max_range:
    # update position, velocity, and acceleration
    x += vx*dt
    y += vy*dt
    z += vz*dt
    vx += ax*dt
    vy += ay*dt
    vz += az*dt
    
    # decrease fuel level
    fuel -= fuel_burn_rate*dt
    
    # store position
    positions_x.append(x)
    positions_y.append(y)
    positions_z.append(z)
    
    # update time
    t += dt

# set up the graph
fig = plt.figure()
ax = fig.add_subplot(1, 1, 1, projection='3d')
ax.set_xlabel('x')
ax.set_ylabel('y')
ax.set_zlabel('z')
plt.title('Missile Flight Path Simulator')
# plot the target
ax.scatter(target_x, target_y, target_z, c='r', marker='o')
# plot the flight path
ax.scatter(positions_x, positions_y, positions_z, c='b', marker='.')



display(fig, target="plot")
