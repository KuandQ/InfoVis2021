//Constructor
class Vec3
{

  constructor( x, y, z )
  {
    this.x = x;
    this.y = y;
    this.z = z;

  }

  add ()
  {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    return this;
  }

  sum ()
  {
    return this.x + this.y + this.z;
  }

  min ()
  {
    if(this.x <= this.y && this.x <= this.z)
    {
    return this.x;
    }
     else if(this.y <= this.x && this.y <= this.z)
     {
     return this.y;
     }
     else if(this.z <= this.x && this.z <= this.y)
     {
     return this.z;
      }
  }


  max ()
  {
    if(this.x >= this.y && this.x >= this.z)
    {
    return this.x;
    }
     else if(this.y >= this.x && this.y >= this.z)
     {
     return this.y;
     }
     else if(this.z >= this.x && this.z >= this.y)
     {
     return this.z;
     }


  }


mid ()
  {
    if(this.x <= this.y)
    {
      if(this.y <= this.z)
      {
        return this.y;
      }
      else if(this.z < this.x)
      {
        return this.x;
      }
      else
      {
        return this.z;
      }
    }
    else if(this.x < this.z)
    {
      return this.x;
    }
    else if(this.z > this.y)
    {
      return this.z;
    }
    else
    {
      return this.y;
    }

  }

}
